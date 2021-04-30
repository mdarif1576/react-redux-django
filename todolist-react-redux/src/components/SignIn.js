import React, { useState } from 'react'

function SignIn(props) {

    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name!==''){
            props.history.push(`/addtodo/${name}`)
        }

    }


    return (
        <div style={{textAlign:'center', marginTop:'5%'}}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" onChange={(evt) => setName(evt.target.value)} placeholder="User Name" id="username" /> <br /> <br/>
                <input type="password"  placeholder="Password" id="password"/> <br /> <br/>
                <button type="submit">LOGIN</button>
            </form> 
        </div>
    )
}

export default SignIn
