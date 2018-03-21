
function test2 (x,callback){
    let d=x*2;
    callback(d)
}

function test10(x){
    return new Promise((res,rej)=>{
        if (x>5){
            res(x);
        }
        else{
            rej(new Error("x<=5"));
        }
    })
}


//let a=test10(5);
let b=test10(7);
//a.then((d)=>{console.log(d)}).catch((err)=>{console.log(err)});
b.then((d)=>{console.log(d)}).catch((err)=>{console.log(err)});


//test2(2,(data)=>{console.log(data)});
test3(6);

function test1(x){
    let d=x*2;
    return d;
}

async function test3(x){
    try
    {let a = await test10(x);
    console.log(a);}
    catch(err){
        console.log(err);
    }
}

//test(1,2,()=>{console.log( 5)})


