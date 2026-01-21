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
                sh "docker compose up  "
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