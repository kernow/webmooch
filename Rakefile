require 'Sprockets'

namespace :js do
  task :combine do
    secretary = Sprockets::Secretary.new(
      :source_files => ["lib/mooch.js", "lib/mooch/*.js"]
    )
    
    # Generate a Sprockets::Concatenation object from the source files
    concatenation = secretary.concatenation
    
    # Write the concatenation to disk
    concatenation.save_to("build/mooch.js")
    puts "generated mooch.js in the build directory"
  end
  
  task :compress do
    executable = File.join(File.dirname(__FILE__), 'vendor', 'closure', 'compiler.jar')
    `java -jar #{executable} --js=build/mooch.js --js_output_file=build/mooch-min.js`
    puts "generated mooch-min.js in the build directory"
  end
  
  task :create_build_dir do
    FileUtils.mkdir('build') unless File.exists?('build')
  end
  
  desc "Combine and compress all javascript files into mooch.js and mooch-min.js"
  task :build => [:create_build_dir, :combine, :compress]
end