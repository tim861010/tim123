const exec = require('child_process').exec
const temp = {"apiVersion":"v1","kind":"Pod","metadata":{"name":"test","labels":{"app":"webserver"}},"spec":{"serviceAccountName":"apiserver","nodeSelector":{"kubernetes.io/os":"linux"},"containers":[{"name":"apiserver","image":"imrc/apiserver","ports":[{"containerPort":8001}]}]}}
const temp2 = JSON.stringify(temp).replace(/\"/g, `\\"`)
console.log(temp2)

const child = exec(`curl -X POST -H "Content-Type: application/json" -d "${temp2}" 3.112.19.240:30390/api/v1/namespaces/default/pods`, (err, std, stderr) => {
    console.log(std)
})