export default async function(context){
    if(context.route.name=='index'){
        try {
            await context.$axios.$get('/users/user/',{'headers':{
               'Authorization':`Bearer ${localStorage.getItem('token')}`
             }})
            .then((response)=>{
                context.redirect('/dashboard')
            })
         
         } catch (error) {
                context.redirect('/login')
                localStorage.clear()

         }
         return
    }
    if(context.route.name=='index' || context.route.name=='login'){
        try {   
            await context.$axios.$get('/users/user/',{'headers':{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                    
              }})
             .then((response)=>{
                context.redirect('/dashboard')
             })
             
        } catch (error) {
                return
        }
    
    }
    else{ 
        try {
            await context.$axios.$get('/users/user/',{'headers':{
               'Authorization':`Bearer ${localStorage.getItem('token')}`
             }})
            .then((response)=>{
            })
         
         } catch (error) {
                context.redirect('/login')
                localStorage.clear()

         }

    }
  
}
