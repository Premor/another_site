const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readf = util.promisify(fs.readFile);
//const writef = util.promisify(fs.writeFile);
exports.install = () => {
    ROUTE('/adminka/',view_a);
    //ROUTE('/adminka',adminka,['post','upload'],100000);
    ROUTE('/adminka/add/',view_d)
    ROUTE('/adminka/add/',album_add, ['post'])
    ROUTE('/adminka/remove/{album}/',view_c);
    ROUTE('/adminka/remove/{album}/',remove,['post']);

    ROUTE('/adminka/add/{album}/',view_b);
    
    ROUTE('/adminka/add/{album}/',adminka,['post','upload'],100000);
}
function view_a(){
    this.view('adminka')
}

function album_add(){
    
}

async function view_d(){
    try{
    const album_name = JSON.parse((await readf(F.config.album_name)).toString('utf-8'));
    this.repository.name_albums = album_name;
    this.view('add')}
    catch(err){
        this.repository.err = err;
        this.view('err')
    }
}

function view_b(){
    this.view('upload')
}

async function view_c(){
    
    try{
    let dir = await readdir(`${F.config.visage_school}/${this.params.album}`)
   
    dir.sort((a,b)=>{
        if (parseInt(a)-parseInt(b)>0)
         {return 1;}
        else 
            {if (parseInt(a)-parseInt(b)<0)
                {return -1;}
            else return 0;
            }
        });
    this.repository.dir = dir;
    this.view('remove')}
    catch(err){
        this.repository.err = err;
        this.view('err')
    }
}

async function remove(){
    //fs.readFile(F.config.encoding)
    try
    {let dir = await readdir(`${F.config.visage_school}/${this.params.album}`)
    dir.sort((a,b)=>{
        if (parseInt(a)-parseInt(b)>0)
         {return 1;}
        else 
            {if (parseInt(a)-parseInt(b)<0)
                {return -1;}
            else return 0;
            }
        });
    let ell = this.body;
    let buf_dir = dir;
    let index2 = 0;
    
    for (let j in ell){
        fs.unlinkSync(`${F.config.visage_school}/${this.params.album}/${buf_dir[j-index2]}`)
        buf_dir.splice(j-index2,1)
        index2++;
    }
    

    let err = encoding_remove(ell,this.params)
    if (err)
        {throw err;}
    for(let i=0;i<buf_dir.length;i++){
        if(parseInt(buf_dir[i])!=i){
            let buf_buf = buf_dir[i].split('.');
            buf_buf[0]=i;
            fs.renameSync(`${F.config.visage_school}/${this.params.album}/${buf_dir[i]}`,`${F.config.visage_school}/${this.params.album}/${buf_buf.join('.')}`)
        }
    }
    this.redirect(`/adminka/remove/${this.params.album}/`)
}catch(err){
    this.repository.err = err;
    this.view('err')
}
}

function encoding_remove(ell,params){
    try{
    let enc_j = JSON.parse((fs.readFileSync(F.config.encoding)).toString('utf-8'));
    let index = 0;
    let index2 = 0;
    for (let e of enc_j){
        if(e.album_name == params.album){
            break;
        }
        index++;
    }
    for (let e in ell){
        enc_j[index].encoding.splice(e-index2,1);
        index2++;
    }
    fs.writeFileSync(F.config.encoding,JSON.stringify(enc_j))
}
    catch(err){
        return err;
    }
    
}

async function adminka(){
    
    try {
    //async ()=>{
        let a = {dir: "suka"}
        
       
        const dir = await readdir(`${F.config.visage_school}/${this.params.album}`)
        let length_d = dir.length;
        
        for(f of this.files){
            
            const data = f.readSync();
            let enc = (f.filename).slice((f.filename).lastIndexOf('.')+1);
            fs.writeFileSync(`${F.config.visage_school}/${this.params.album}/${length_d}.${enc}`,data)
            length_d+=1;
            
            encoding_add(enc,this.params);
            
        }
      
        this.view('upload')}
    catch(err){
        this.repository.err = err;
        this.view('err')
    }
}

async function encoding_add(enc,params){
    try {
       
        
        let enc_j = JSON.parse((fs.readFileSync(F.config.encoding)).toString('utf-8'));
        
        
        let i = 0;
		for(i=0;i<enc_j.length;i++)
		{
			if (enc_j[i].album_name == params.album)
				break
		}
        enc_j[i].encoding.push(enc);
        
        fs.writeFileSync(F.config.encoding,JSON.stringify(enc_j))
    }
    catch(err){
        return err;
    }
}