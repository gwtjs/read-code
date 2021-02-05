
'use strict';

const watch = require('watch');
const http = require('http')
const {exec} = require('child_process')
const fs = require('fs')
const net = require('net')
const crypto = require('crypto')

const KEY = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

function startServer(hostname, port) {
    const server = http.createServer((req,res)=>{
        const {url} = req
        res.setHeader('Content-Type','utf8')
        if(url === '/'){
            res.writeHead(200, { 'Content-Type': 'text/html;utf8' })
            fs.readFile(__dirname + "/index.html", "utf-8", function (error, data){
                if(error)
                    res.end("404");
                else
                    res.end(data.toString());
            });
        }else if(url.endsWith('.js')){
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            fs.readFile(__dirname + url, "utf-8", function (error, data){
                if(error)
                    res.end("404");
                else
                    res.end(data.toString());
            });
        }else {
            res.end('404')
        }
    }).on('upgrade',(req, socket,head)=>{
        const {headers} = req
        const key = crypto.createHash('sha1').update(headers["sec-websocket-key"]+KEY).digest('base64')
        socket.write(['HTTP/1.1 101 Switching Protocols','Upgrade: websocket','Connection: Upgrade',`sec-websocket-accept: ${key}`].join('\r\n')+'\r\n\r\n')
        
        socket.on('data', function (buf) {
            logBuf(buf, 'buf')
            const result = decodeFrame(buf)
            logBuf(result, 'recive')
            console.log(result.toString(), 'recive to string')
        });
        socket.on('error', (e)=>{console.log(e)});
        
        watch.createMonitor('./build', function (monitor) {
            monitor.on('changed', function (f, curr, prev) {
                if(!socket.destroyed) {
                    console.log(f + ' changed!');
                    socket.write(encodeFrame('changed'))
                }
                // socket.end()
            });
        });
    }).listen(port,hostname,()=>{
        console.log('server started, click http://'+hostname+':'+port+' to view the page')
    })
}

function decodeFrame(buf) {
    const length = buf.readUInt8(1) & 0x7f
    const mask = buf.slice(2,6)
    const payload = buf.slice(6)
    let formattedBuf = Buffer.alloc(payload.length)
    for(let i=0;i<payload.length;i++) {
        formattedBuf[i] = mask[i%4] ^ payload[i]
    }
    return formattedBuf
}

function encodeFrame(str) {
    const payload = Buffer.from(str)
    const frame = Buffer.alloc(payload.length+2)
    frame.writeUInt8(0b10000001)
    frame.writeUInt8(0b00000000+payload.length,1)
    payload.copy(frame,2)
    return frame
}

function logBuf(buf, msg) {
    let values = ''
    for(let value of buf.values()){
        value = value.toString(2)
        value = value.length<8?value.padStart(8,'0'):value
        values += value + ' '
    }
    console.log(buf.length, values, msg)
}

function openUrl(url) {
    exec('start ' + url);
}

function watchDir(dir) {
    net.createServer(client=>{
        client.write('hello')
        client.pipe(client)
        watch.createMonitor(dir, function (monitor) {
            monitor.on('changed', function (f, curr, prev) {
                console.log(f + ' changed!');
                client.write('changed')
                client.pipe(client)
            });
        });
        client.on('end',()=>{
            console.log('client is disconnected')
        })
    }).listen(8888,()=>{
        console.log('socket started')
    })
}

function run(){
    startServer('localhost', 8080)
    // openUrl('http://localhost:8080')
    watchDir('./build')
}

run()