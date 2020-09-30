module.exports = function(grunt) {
    const sPwd = grunt.option('pwd');

    grunt.initConfig({
        nwabap_ui5uploader: {
            options: {
                conn: {
                    server: 'https://ngi.sap.swm.de:44311',
                    useStrictSSL:false
                },
                auth: {
                    user: "ESPITALIEDO",
                    pwd: sPwd
                }
            },
            upload_build: {
                options: {
                    ui5: {
                        package: '$TMP',
                        bspcontainer: 'ZESP_BASIC',
						bspcontainer_text: "basic ui5 app",
						calc_appindex:true
                    },
                    resources: {
                        cwd: 'dist',
                        src: '**/*.*'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nwabap-ui5uploader');
    grunt.registerTask('default', ['nwabap_ui5uploader']);
    grunt.registerTask('deploy', ['nwabap_ui5uploader']);

};
