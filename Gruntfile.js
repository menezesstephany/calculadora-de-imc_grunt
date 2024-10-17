module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Tarefa para minificar o HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html' // destino: origem
                }
            },
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false // Não colapsar no dev
                },
                files: {
                    'dev/index.html': 'src/index.html' // destino: origem
                }
            }
        },

        // Substituição de strings para diferenciar dev e dist
        'string-replace': {
            dist: {
                files: {
                    'dist/index.html': 'dist/index.html'
                },
                options: {
                    replacements: [{
                        pattern: '{{ script_file }}',
                        replacement: 'main.min.js' // Em produção, usa o arquivo minificado
                    }]
                }
            },
            dev: {
                files: {
                    'dev/index.html': 'dev/index.html'
                },
                options: {
                    replacements: [{
                        pattern: '{{ script_file }}',
                        replacement: 'main.js' // Em desenvolvimento, usa o arquivo não minificado
                    }]
                }
            }
        },

        // Tarefa para minificar o JavaScript
        uglify: {
            dist: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            },
            dev: {
                files: {
                    'dev/scripts/main.js': 'src/scripts/main.js' // Copia o arquivo não minificado
                }
            }
        },

        // Tarefa para compilar LESS
        less: {
            development: {
                options: {
                    compress: false // Para dev, não comprimir
                },
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' // destino: origem
                }
            },
            dist: {
                options: {
                    compress: true // Para dist, comprimir
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' // destino: origem
                }
            }
        }
    });

    // Carregar os plugins que fornecem as tarefas
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-string-replace');

    // Tarefa padrão
    grunt.registerTask('default', ['htmlmin', 'uglify', 'less']);
    
    // Tarefa para desenvolvimento
    grunt.registerTask('dev', ['htmlmin:dev', 'uglify:dev', 'less:development', 'string-replace:dev']);
    
    // Tarefa para build
    grunt.registerTask('build', ['htmlmin:dist', 'uglify:dist', 'less:dist', 'string-replace:dist']);
};
