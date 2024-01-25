import changeLogin from '../components/TestComponent/Test'

export function TestButton(){
    return(
    <button type='button' onClick={()=>{changeLogin()}}>change login name</button>
    )
}