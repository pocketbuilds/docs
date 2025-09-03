<script context="module">

	export class DocsManager {
		#list = [];
		#currentIndex = -1;

		constructor(content, allContent) {
			// Add content to allContent in case of new content node
			if (!allContent.some(c => c.filename === content.filename)) {
				allContent = [...allContent, content];
			}

			const index = allContent.find(c => c.type === "_index");
			const groups = allContent.filter(c => c.type === "groups").sort(sortFunc);
			const docs = allContent.filter(c => c.type === "docs");

			index.path = ""; // fix double slash

			this.#list = [index];

			groups.forEach(group => {
				this.#list = [
					...this.#list,
					group,
					...docs.filter(c => c.fields.group === group.path).sort(sortFunc),
				];
			})


			this.#list.forEach((c, i) => {
				if (c.filename === content.filename) {
					this.#currentIndex = i;
				}
			});
		}

		get list() {
			return [...this.#list];
		}

		get prev() {
			if (this.#currentIndex > 0) {
				return (this.#list || []).at(this.#currentIndex -1);
			}
		}

		get next() {
			return (this.#list || []).at(this.#currentIndex + 1);
		}
	}

	function sortFunc(a, b) {
		if (a?.fields?.order != null && b?.fields?.order != null) {
			return a.fields.order - b.fields.order;
		}
		return -1;
	}

</script>
