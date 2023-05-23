import Client from 'ssh2-sftp-client';
import path from 'path'
import { fileURLToPath } from 'url'

let client = new Client();
const config = {
    host: '',
    port: '',
    username: '',
    password: ''
}
const __filename = fileURLToPath(import.meta.url)
const localPath = path.resolve(path.dirname(__filename), '../platform-h5/dist')
const remotePath = '/usr/share/nginx/html'
const main = async () => {
    try {
        await client.connect(config);
//         慎用删除  如需使用需备份
//         if (await client.exists(remotePath)) {
//             await client.rmdir(remotePath, true)
//             console.log('删除成功')
//         }
        let result = await client.uploadDir(localPath, remotePath);
        console.log('上传成功')
        return result;
    } finally {
        await client.end();
    }
}

// main();
