pipeline {
    agent any
    
    tools { 
        nodejs 'node20' 
    }
    
    triggers {
        pollSCM('H/2 * * * *')
    }
    
    environment {
        SELENIUM_REMOTE_URL = 'http://selenium:4444/wd/hub'
    }
    
    stages {
        stage('Install') { 
            steps { 
                sh 'npm install' 
            } 
        }
        
        stage('Test') { 
            steps { 
                sh '''
                    node src/app.js &
                    sleep 3
                    npm test
                '''
            } 
        }
    }
}