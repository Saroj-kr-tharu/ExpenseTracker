pipeline{
    agent {label "dev"}

    stages{
        stage("Code"){ 
            steps{
                echo "Clonning Code"
                git url: "https://github.com/Saroj-kr-tharu/ExpenseTracker", branch: "main"
            } 
        }
        stage("trivy"){ 
            steps{
                echo " Scanning Code Base By Trivy "
                sh 'trivy fs . -o results.json'
            } 
        }

        stage("Inject Environment Files"){ 
            steps{ 
                sh "mkdir -p environment"

                withCredentials( [
                    file(credentialsId: 'env-mysql', variable: 'MYSQL_ENV'),
                    file(credentialsId: 'env-backend', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'env-frontend', variable: 'FRONTEND_ENV')
                ] ){
                    sh '''
                        cp $MYSQL_ENV environment/.env.mysql
                        cp $BACKEND_ENV environment/.env.backend
                        cp $FRONTEND_ENV environment/.env.fortend
                    '''
                }
            }
        }
        
        stage("Docker build && Push"){ 
            steps{
                echo "Docker Push Images to docker hub "
                sh " docker compose build "
                withCredentials(  [usernamePassword(
                        credentialsId: "dockerHubCreds",
                        passwordVariable:"dockerHubPass" ,
                        usernameVariable:"dockerHubUser" )]
                    ){
                        sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                        sh "docker compose push"
                     }
            } 
            }
        stage("Docker  run"){ 
            steps{ 
                echo "Deploying Docker compose up"
                sh "docker compose up  -d "
             } 
            }
    }
    post{
        success{ 
            script{ 
                emailext from: 'sarojc11345@gmail.com',
                to: 'sarojc11345@gmail.com',
                body: 'Build success for ExpenseTracker CICD App',
                subject: 'Build success for ExpenseTracker CICD App'
             } 
            }
        failure{ 
            script{   
                emailext from: 'sarojc11345@gmail.com',
                to: 'sarojc11345@gmail.com',
                body: 'Build Failed for ExpenseTracker CICD App',
                subject: 'Build Failed for ExpenseTracker CICD App' 
            } }
    }
}