pipeline {
    agent any
    stages {
        stage("Checkout") {
            steps {                          // stpes → steps
                checkout scm
            }
        }

        stage("Login Docker") {
            steps {                          // stpes → steps
                withCredentials([            // wiheCredentails → withCredentials
                    string(credentialsId: 'DOCKERHUB_PASSWORD', variable: 'DOCKER_PASS'),   // credentailsId → credentialsId
                    string(credentialsId: 'DOCKERHUB_USERNAME', variable: 'DOCKER_USER')
                ]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'  // loing → login, $"DOCKER_USER" → "$DOCKER_USER"
                }
            }
        }

        stage("Pull images") {
            steps {                          // stpes → steps
                withCredentials([            // wiheCredentails → withCredentials
                    string(credentialsId: 'DOCKERHUB_USERNAME', variable: 'DOCKER_USER')    // credentailsId → credentialsId
                ]) {
                    sh """
                        docker pull $DOCKER_USER/frontend:latest
                        docker pull $DOCKER_USER/backend:latest
                    """
                }
            }
        }

        stage('Create .env file') {
            steps {
                withCredentials([
                    string(credentialsId: 'DB_HOST',              variable: 'DB_HOST'),
                    string(credentialsId: 'DB_PORT',              variable: 'DB_PORT'),
                    string(credentialsId: 'DB_USER',              variable: 'DB_USER'),
                    string(credentialsId: 'DB_PASSWORD',          variable: 'DB_PASSWORD'),
                    string(credentialsId: 'DB_NAME',              variable: 'DB_NAME'),
                    string(credentialsId: 'JWT_SECRET',           variable: 'JWT_SECRET'),
                    string(credentialsId: 'DATABASE_URL',         variable: 'DATABASE_URL'),
                    string(credentialsId: 'GOOGLE_CLIENT_ID',     variable: 'GOOGLE_CLIENT_ID'),
                    string(credentialsId: 'GOOGLE_CLIENT_SECRET', variable: 'GOOGLE_CLIENT_SECRET'),
                    string(credentialsId: 'GOOGLE_CALLBACK_URL',  variable: 'GOOGLE_CALLBACK_URL'),
                    string(credentialsId: 'NODE_ENV',             variable: 'NODE_ENV'),
                    string(credentialsId: 'NEXT_PUBLIC_API_URL',  variable: 'NEXT_PUBLIC_API_URL'),
                ]) {
                    writeFile file: '.env', text: """\
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
JWT_SECRET=${JWT_SECRET}
DATABASE_URL=${DATABASE_URL}
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
GOOGLE_CALLBACK_URL=${GOOGLE_CALLBACK_URL}
NODE_ENV=${NODE_ENV}
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
""".stripIndent()
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'DOCKERHUB_USERNAME', variable: 'DOCKER_USER'),
                ]) {
                    sh 'docker compose up -d --build'
                }
            }
        }
    }                                        

    post {
        success { echo '✅ Deploy สำเร็จ!' }
        failure { echo '❌ Deploy ล้มเหลว!' }
    }
}