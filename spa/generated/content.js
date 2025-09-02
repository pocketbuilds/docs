const allContent=[{pager:null,type:"_index",path:"/",filepath:"content/_index.json",filename:"_index.json",fields:{title:"PocketBuilds Docs"}},{pager:null,type:"docs",path:"creating-a-plugin/plugin-config",filepath:"content/docs/plugin-config.json",filename:"plugin-config.json",fields:{title:"Plugin Config",group:"creating-a-plugin",order:0,components:[{name:"markdown",body:{markdown:`The xpb runtime uses a \`pocketbuilds.toml\` file to allow for the user to customize plugin config options. This file is read, converted to JSON, and then automatically Unmarshalled into your plugin struct.

Consider the example plugin below:
\`\`\`go
type Plugin struct {
	MyVar string \`json:"my_var"\`
}

func init() {
	xpb.Register(&Plugin{
		MyVar: "Hello, xpb!",
	})
}

func (p *Plugin) Name() string {
	return "my_plugin"
}
\`\`\`

This plugin defines a config variable of type string called \`MyVar\`. This variable will be populated with the \`my_plugin.my_var\` value in "pocketbuilds.toml". This happens before your plugin's \`Init\` function is called. See the corresponding TOML below:

\`\`\`toml
[my_plugin]
my_var = "Hello from TOML"
\`\`\`

You also may notice when the plugin is registered in the \`init\` function, is sets an initial value for \`MyVar\`. This is useful for setting your plugin's default config values if the user does not put it in their "pocketbuilds.toml" file.`,rendered:`<p>The xpb runtime uses a <code data-highlighted="yes" class="hljs language-undefined">pocketbuilds.toml</code> file to allow for the user to customize plugin config options. This file is read, converted to JSON, and then automatically Unmarshalled into your plugin struct.</p>
<p>Consider the example plugin below:</p>
<pre><code data-highlighted="yes" class="hljs language-go"><span class="hljs-keyword">type</span> Plugin <span class="hljs-keyword">struct</span> {
	MyVar <span class="hljs-type">string</span> <span class="hljs-string">\`json:"my_var"\`</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span> {
	xpb.Register(&amp;Plugin{
		MyVar: <span class="hljs-string">"Hello, xpb!"</span>,
	})
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(p *Plugin)</span></span> Name() <span class="hljs-type">string</span> {
	<span class="hljs-keyword">return</span> <span class="hljs-string">"my_plugin"</span>
}
</code></pre>
<p>This plugin defines a config variable of type string called <code data-highlighted="yes" class="hljs language-undefined">MyVar</code>. This variable will be populated with the <code data-highlighted="yes" class="hljs language-undefined">my_plugin.my_var</code> value in "pocketbuilds.toml". This happens before your plugin's <code data-highlighted="yes" class="hljs language-undefined">Init</code> function is called. See the corresponding TOML below:</p>
<pre><code data-highlighted="yes" class="hljs language-ini"><span class="hljs-section">[my_plugin]</span>
<span class="hljs-attr">my_var</span> = <span class="hljs-string">"Hello from TOML"</span>
</code></pre>
<p>You also may notice when the plugin is registered in the <code data-highlighted="yes" class="hljs language-csharp"><span class="hljs-keyword">init</span></code> function, is sets an initial value for <code data-highlighted="yes" class="hljs language-undefined">MyVar</code>. This is useful for setting your plugin's default config values if the user does not put it in their "pocketbuilds.toml" file.</p>`}}]}},{pager:null,type:"groups",path:"creating-a-plugin",filepath:"content/groups/creating_a_plugin.json",filename:"creating_a_plugin.json",fields:{title:"Creating a Plugin",order:0,components:[{name:"markdown",body:{markdown:`You can use the following command to create a plugin project in the working directory:

\`\`\`sh
xpb plugin init <plugin_name>
\`\`\`

This command will create a Go module using **plugin_name** as the module name.

The key file to note is **plugin.go**. It will look something like this:`,rendered:`<p>You can use the following command to create a plugin project in the working directory:</p>
<pre><code class="language-sh hljs language-bash" data-highlighted="yes">xpb plugin init &lt;plugin_name&gt;
</code></pre>
<p>This command will create a Go module using <strong>plugin_name</strong> as the module name.</p>
<p>The key file to note is <strong>plugin.go</strong>. It will look something like this:</p>`}},{name:"accordion",components:[{name:"markdown",body:{markdown:`\`\`\`go
package plugin

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbuilds/xpb"
)

type Plugin struct {}

func init() {
	xpb.Register(&Plugin{})
}

// Name implements xpb.Plugin.
func (p *Plugin) Name() string {
	return "plugin"
}

// This variable will automatically be set at build time by xpb
var version string

// Version implements xpb.Plugin.
func (p *Plugin) Version() string {
	return version
}

// Description implements xpb.Plugin.
func (p *Plugin) Description() string {
	panic("unimplemented")
}

// Init implements xpb.Plugin.
func (p *Plugin) Init(app core.App) error {
	panic("unimplemented")
}
\`\`\``,rendered:`<pre><code data-highlighted="yes" class="hljs language-go"><span class="hljs-keyword">package</span> plugin

<span class="hljs-keyword">import</span> (
	<span class="hljs-string">"github.com/pocketbase/pocketbase/core"</span>
	<span class="hljs-string">"github.com/pocketbuilds/xpb"</span>
)

<span class="hljs-keyword">type</span> Plugin <span class="hljs-keyword">struct</span> {}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span> {
	xpb.Register(&amp;Plugin{})
}

<span class="hljs-comment">// Name implements xpb.Plugin.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(p *Plugin)</span></span> Name() <span class="hljs-type">string</span> {
	<span class="hljs-keyword">return</span> <span class="hljs-string">"plugin"</span>
}

<span class="hljs-comment">// This variable will automatically be set at build time by xpb</span>
<span class="hljs-keyword">var</span> version <span class="hljs-type">string</span>

<span class="hljs-comment">// Version implements xpb.Plugin.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(p *Plugin)</span></span> Version() <span class="hljs-type">string</span> {
	<span class="hljs-keyword">return</span> version
}

<span class="hljs-comment">// Description implements xpb.Plugin.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(p *Plugin)</span></span> Description() <span class="hljs-type">string</span> {
	<span class="hljs-built_in">panic</span>(<span class="hljs-string">"unimplemented"</span>)
}

<span class="hljs-comment">// Init implements xpb.Plugin.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(p *Plugin)</span></span> Init(app core.App) <span class="hljs-type">error</span> {
	<span class="hljs-built_in">panic</span>(<span class="hljs-string">"unimplemented"</span>)
}
</code></pre>`}}]},{name:"markdown",body:{markdown:"The struct here called `Plugin` adheres to the `xpb.Plugin` interface, which allows it to be registered to the xpb runtime in the `init()` function (a special Go function that runs when your Go module is first loaded).\n\nThe `xpb.Plugin` interface looks like this:\n\n```go\ntype Plugin interface {\n	Init(app core.App) error\n	Name() string\n	Version() string\n	Description() string\n}\n```\n\n- `Init(app core.App) error` is called before the pocketbase application runs. Here you should register pocketbase app [hooks](https://pocketbase.io/docs/go-event-hooks/) to make your plugin do whatever you want it to do.\n\n- `Name() string` should return your plugin's unique name. Plugin names should follow a snake case naming convention, i.e. \"my_plugin\".\n\n- `Version() string` should return your plugin's current version number. You will notice that in the example it returns a package-level variable called `version`. At build time, xpb automatically sets this variable for you using the version in the build projects `go.mod` file, so you should not need to generally worry about this.\n\n- `Description() string` should return a short description of what you plugin is and what it does. This is used in the set of pocketbase xpb commands for listing currently installed plugins.",rendered:`<p>The struct here called <code data-highlighted="yes" class="hljs language-undefined">Plugin</code> adheres to the <code data-highlighted="yes" class="hljs language-undefined">xpb.Plugin</code> interface, which allows it to be registered to the xpb runtime in the <code data-highlighted="yes" class="hljs language-scss"><span class="hljs-built_in">init</span>()</code> function (a special Go function that runs when your Go module is first loaded).</p>
<p>The <code data-highlighted="yes" class="hljs language-undefined">xpb.Plugin</code> interface looks like this:</p>
<pre><code class="language-go hljs" data-highlighted="yes"><span class="hljs-keyword">type</span> Plugin <span class="hljs-keyword">interface</span> {
	Init(app core.App) <span class="hljs-type">error</span>
	Name() <span class="hljs-type">string</span>
	Version() <span class="hljs-type">string</span>
	Description() <span class="hljs-type">string</span>
}
</code></pre>
<ul>
<li><p><code data-highlighted="yes" class="hljs language-scss"><span class="hljs-built_in">Init</span>(app core.App) error</code> is called before the pocketbase application runs. Here you should register pocketbase app <a href="https://pocketbase.io/docs/go-event-hooks/">hooks</a> to make your plugin do whatever you want it to do.</p>
</li>
<li><p><code data-highlighted="yes" class="hljs language-scss"><span class="hljs-built_in">Name</span>() string</code> should return your plugin's unique name. Plugin names should follow a snake case naming convention, i.e. "my_plugin".</p>
</li>
<li><p><code data-highlighted="yes" class="hljs language-scss"><span class="hljs-built_in">Version</span>() string</code> should return your plugin's current version number. You will notice that in the example it returns a package-level variable called <code data-highlighted="yes" class="hljs language-undefined">version</code>. At build time, xpb automatically sets this variable for you using the version in the build projects <code data-highlighted="yes" class="hljs language-go"><span class="hljs-keyword">go</span>.mod</code> file, so you should not need to generally worry about this.</p>
</li>
<li><p><code data-highlighted="yes" class="hljs language-scss"><span class="hljs-built_in">Description</span>() string</code> should return a short description of what you plugin is and what it does. This is used in the set of pocketbase xpb commands for listing currently installed plugins.</p>
</li>
</ul>`}}]}}];export default allContent