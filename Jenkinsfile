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
        stage("Build Docker"){ 
            steps{
                echo "Building Docker"
                sh "docker build -t expenseTracker ."
                } 
            }
        stage("Docker Push"){ 
            steps{
                echo "Docker Push Images to docker hub "
                 withCredentials(  [usernamePassword(
                        credentialsId: "dockerHubCreds",
                        passwordVariable:"dockerHubPass" ,
                        usernameVariable:"dockerHubUser" )]
                    ){
                        sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                        sh "docker image tag expenseTracker ${env.dockerHubUser}/expenseTracker"
                        sh "docker push ${env.dockerHubUser}/expenseTracker:latest"
                     }
            } 
            }
        stage("Docker  run"){ 
            steps{ 
                echo "Deploying Docker compose up"
                sh "docker compose up -d --build expenseTracker"
             } 
            }
    }
    post{
        success{ 
            script{ echo "Building Sucessfuly CICD " } 
            }
        failure{ script{ echo "Failed Building CICD " } }
    }
}