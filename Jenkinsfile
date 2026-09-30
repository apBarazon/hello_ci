pipeline {
    agent any
    
    tools { 
        nodejs 'node20' 
    }
    
    triggers {
        pollSCM('H/2 * * * *') // Checks GitHub for changes every 2 minutes
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
                sh 'npm test' 
            } 
        }
        
        stage('UI Test') {
            steps {
                // Starts the app in the background, runs the Selenium E2E test with JUnit output, and shuts down
                sh '''
                    node src/app.js &
                    sleep 3
                    npx jest tests/e2e/home.test.js --reporters=default --reporters=jest-junit
                '''
            }
        }
    }
    
    post {
        always {
            junit 'junit.xml'
        }
    }
}