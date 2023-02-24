# Tools

## Editor

I use [helix](https://helix-editor.com/) as my main editor 

### Language Server Setup

Install solargraph LSP

``` bash
gem install --user-install solargraph
```

Add ruby gems to path to run executable gems
``` bash
# appended to ~/.bashrc
export PATH="~/.local/share/gem/ruby/3.0.0/bin/:$PATH"
```

Verify helix can see solargraph is installed
``` bash
hx --health ruby
```