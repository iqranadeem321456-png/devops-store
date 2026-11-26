pipeline {
  agent any
  stages {
    stage('Checkout') { steps { git branch: 'main', url: 'https://github.com/YOUR_USERNAME/online-store.git' } }
    stage('Build')    { steps { sh 'docker build -t online-store .' } }
    stage('Test')     { steps { sh 'docker run --rm online-store npm test' } }
    stage('Deploy')   {
      steps {
        sh 'docker rm -f online-store || true'
        sh 'docker run -d --name online-store -p 80:3000 online-store'
      }
    }
  }
}
