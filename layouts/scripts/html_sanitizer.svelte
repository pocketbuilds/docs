<script context="module">

	//JavaScript HTML Sanitizer v2.0.2, (c) Alexander Yumashev, Jitbit Software.
	//homepage https://github.com/jitbit/HtmlSanitizer
	//License: MIT https://github.com/jitbit/HtmlSanitizer/blob/master/LICENSE
	//Modified to fit project needs

	export class HtmlSanitizer {

		static tagWhitelist = {
			'A':          true,
			'ABBR':       true,
			'B':          true,
			'BLOCKQUOTE': true,
			'BODY':       true,
			'BR':         true,
			'CENTER':     true,
			'CODE':       true,
			'DD':         true,
			'DIV':        true,
			'DL':         true,
			'DT':         true,
			'EM':         true,
			'FONT':       true,
			'H1':         true,
			'H2':         true,
			'H3':         true,
			'H4':         true,
			'H5':         true,
			'H6':         true,
			'HR':         true,
			'I':          true,
			'IMG':        true,
			'LABEL':      true,
			'LI':         true,
			'OL':         true,
			'P':          true,
			'PRE':        true,
			'S':          true,
			'STRIKE':     true,
			'SMALL':      true,
			'SOURCE':     true,
			'SPAN':       true,
			'STRONG':     true,
			'SUB':        true,
			'SUP':        true,
			'TABLE':      true,
			'TBODY':      true,
			'TR':         true,
			'TD':         true,
			'TH':         true,
			'THEAD':      true,
			'UL':         true,
			'U':          true,
			'VIDEO':      true,
		};

		// tags that will be converted to new mapped tag
		static tagConvertMapping = {
			'STRIKE':                    'S',
			'FORM':                      'DIV',
			'GOOGLE-SHEETS-HTML-ORIGIN': 'DIV',
		};

		static attributeWhitelist = {
			'align':    true,
			'color':    true,
			'controls': true,
			'height':   true,
			'href':     true,
			'id':       true,
			'src':      true,
			'style':    false,
			'target':   true,
			'title':    true,
			'type':     true,
			'width':    true,
		};

		static classWhitelist = {};

		static cssWhitelist = {
			'background-color': false,
			'color':            false,
			'font-size':        false,
			'font-weight':      false,
			'text-align':       false,
			'text-decoration':  false,
			'width':            false,
		};

		// which "protocols" are allowed in "href", "src" etc
		static schemaWhiteList = [
			'http:',
			'https:',
			'data:',
			'm-files:',
			'file:',
			'ftp:',
			'mailto:',
			'pw:',
		];

		static uriAttributes = {
			'href': true,
			'action': true,
		};

		SanitizeHtml(input, extraSelector) {
			const parser = new DOMParser();

			input = input.trim();
			if (input == "") return ""; //to save performance

			//firefox "bogus node" workaround for wysiwyg's
			if (input == "<br>") return "";

			if (input.indexOf("<body")==-1) input = "<body>" + input + "</body>"; //add "body" otherwise some tags are skipped, like <style>

			let doc = parser.parseFromString(input, "text/html");

			//DOM clobbering check (damn you firefox)
			if (doc.body.tagName !== 'BODY')
				doc.body.remove();
			if (typeof doc.createElement !== 'function')
				doc.createElement.remove();

			const makeSanitizedCopy = (node) => {
				let newNode;
				if (node.nodeType == Node.TEXT_NODE) {
					newNode = node.cloneNode(true);
				} else if (node.nodeType == Node.ELEMENT_NODE && (this.AllowedTags[node.tagName] || this.TagConvertMapping[node.tagName] || (extraSelector && node.matches(extraSelector)))) { //is tag allowed?

					if (this.TagConvertMapping[node.tagName])
						newNode = doc.createElement(this.TagConvertMapping[node.tagName]); //convert to mapped tag
					else
						newNode = doc.createElement(node.tagName);

					for (let i = 0; i < node.attributes.length; i++) {
						let attr = node.attributes[i];
						if (this.AllowedAttributes[attr.name]) {
							if (attr.name == "style") {
								for (let s = 0; s < node.style.length; s++) {
									let styleName = node.style[s];
									if (this.AllowedCssStyles[styleName])
										newNode.style.setProperty(styleName, node.style.getPropertyValue(styleName));
								}
							} else if (attr.name == "class" && Object.keys(this.AllowedClasses).length) {
								node.classList.forEach(c => {
									if (this.AllowedClasses[c]) {
										newNode.classList.add(c);
									}
								})
							} else {
								if (HtmlSanitizer.uriAttributes[attr.name]) { //if this is a "uri" attribute, that can have "javascript:" or something
									if (attr.value.indexOf(":") > -1 && !this.startsWithAny(attr.value, HtmlSanitizer.schemaWhiteList))
										continue;
								}
								newNode.setAttribute(attr.name, attr.value);
							}
						}
					}
					for (let i = 0; i < node.childNodes.length; i++) {
						let subCopy = makeSanitizedCopy(node.childNodes[i]);
						newNode.appendChild(subCopy, false);
					}

					//remove useless empty spans (lots of those when pasting from MS Outlook)
					if ((newNode.tagName == "SPAN" || newNode.tagName == "B" || newNode.tagName == "I" || newNode.tagName == "U")
							&& newNode.innerHTML.trim() == "") {
						return doc.createDocumentFragment();
					}

				} else {
					newNode = doc.createDocumentFragment();
				}
				return newNode;
			};

			let resultElement = makeSanitizedCopy(doc.body);

			return resultElement.innerHTML
				.replace(/<br[^>]*>(\S)/g, "<br>\n$1")
				.replace(/div><div/g, "div>\n<div"); //replace is just for cleaner code
		}

		startsWithAny(str, substrings) {
			for (let i = 0; i < substrings.length; i++) {
				if (str.indexOf(substrings[i]) == 0) {
					return true;
				}
			}
			return false;
		}

		constructor() {
			this.AllowedTags = HtmlSanitizer.tagWhitelist;
			this.AllowedAttributes = HtmlSanitizer.attributeWhitelist;
			this.AllowedClasses = HtmlSanitizer.classWhitelist;
			this.AllowedCssStyles = HtmlSanitizer.cssWhitelist;
			this.AllowedSchemas = HtmlSanitizer.schemaWhiteList;
			this.TagConvertMapping = HtmlSanitizer.tagConvertMapping;
		}
	}
</script>
