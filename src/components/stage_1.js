import { useState, useContext, useRef } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';


import { MyContext } from '../context';

const Stage1 = () => {
    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, '']);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);
        
        if(validate){
            // form is valid ... add player
            setError([false, '']);
            context.addPlayer(value);
            textInput.current.value = value;

        } else {
            console.log('error');
        }
    }

    const validateInput = (value) => {
        if(value===''){
            setError([true, 'Sorry, you need to add something']);
            return false;
        }
        if(value.length <= 2){
            setError([true, 'Sorry, you need 3 char at least']);
            return false;
        }
        return true;
    }

    // console.log(context);
    return (
        <>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control 
                        type="text"
                        placeholder="Add player name"
                        name="player"
                        ref={textInput}
                    />
                </Form.Group>
                { 
                    error[0] ?  
                    <Alert variant='danger'>
                        {error[1]}
                    </Alert> 
                    : null
                }
                <Button className="miami" variant="primary" type="submit">
                    Add player
                </Button>
                {
                    context.state.players && context.state.players.length > 0 ?
                    <>
                        <div>
                            <ul className='list-group'> 
                            {

                                context.state.players.map((player, idx  ) => (
                                    <li key={idx} className='list-group-item d-flex justify-content-between align-items-center list-group-item-action'>
                                        {player}
                                        <span className='badge badge-danger' 
                                            onClick={() => alert('removed')}
                                        >x</span>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    </>
                    : null
                }
            </Form>
        </>
    );
}

export default Stage1;
