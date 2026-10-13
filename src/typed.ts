export async function typedChat(_client: unknown) {
 const response=await fetch('https://monitoring-fixture.invalid/v1/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:'Synthetic hello',model:'fixture-model'})});
 return response.json();
}
export async function dynamicChat(_client: unknown,_method: string) {
 const response=await fetch('https://monitoring-fixture.invalid/v1/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:'Synthetic dynamic',model:'fixture-model'})});
 return response.json();
}
