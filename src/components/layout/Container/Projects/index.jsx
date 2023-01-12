import React, {useState} from 'react'
import TextArea from '../../../Textarea'
import './Projects.css'

function Projects() {
  const [text1, setText1] = useState('Escreva um e-mail formal solicitando aumento de salário');
  const [text2, setText2] = useState("como consigo configurar minha API feita em fastAPI em python para que consiga receber imagens em JPG e envie para um outro servidor");
  const [text3, setText3] = useState("Eu quero que você aja como um contador de histórias. Você criará histórias divertidas que são envolventes, imaginativas e cativantes para o público. Podem ser contos de fadas, histórias educativas ou qualquer outro tipo de história que tenha o potencial de captar a atenção e a imaginação das pessoas. Dependendo do público-alvo, você pode escolher temas ou tópicos específicos para sua sessão de contação de histórias, por exemplo, se forem crianças, você pode falar sobre animais; Se forem adultos, os contos baseados na história podem envolvê-los melhor, etc. Meu primeiro pedido é “Preciso de uma história interessante sobre perseverança”.");
  const textareaRef1 = React.useRef(null);
  const textareaRef2 = React.useRef(null);
  const textareaRef3 = React.useRef(null);
  return (
    <div>
      
        <div>
            <h2 id='Prompts'>Prompts</h2>
            <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: baixa </span>
            <div className='container-projects'>
             <div>
                <h3> Crie um email</h3>
                
                <div>
                <TextArea 
                text={text1}
                textareaRef={textareaRef1}
                onChange={e => setText1(e.target.value)} />
                </div>
              </div>
            </div>
            
            

            <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/edurodrigues533'> @edurodrigues533 </a> complexidade: média </span>
            <div className='container-projects'>
             <div>
                <h3> Configurar API em fastAPI</h3>
                <div>
                <TextArea 
                text={text2}
                textareaRef={textareaRef2}
                onChange={e => setText2(e.target.value)} />
                </div>
              </div>
            </div>


            <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: alta </span>
            <div className='container-projects'>
             <div>
                <h3> Atuar como um contador de histórias</h3>
                <div>
                <TextArea 
                text={text3}
                textareaRef={textareaRef3}
                onChange={e => setText2(e.target.value)} />
                </div>
              </div>
            </div>

            </div>
    </div>
    
  )
}

export default Projects