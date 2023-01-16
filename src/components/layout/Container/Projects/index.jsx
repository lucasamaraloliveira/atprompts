import React, {useState} from 'react'
import TextArea from '../../../Textarea'
import './Projects.css'

function Projects() {
  const [text1, setText1] = useState('Escreva um e-mail formal solicitando aumento de salário');
  const [text2, setText2] = useState("como consigo configurar minha API feita em fastAPI em python para que consiga receber imagens em JPG e envie para um outro servidor");
  const [text3, setText3] = useState("Eu quero que você aja como um contador de histórias. Você criará histórias divertidas que são envolventes, imaginativas e cativantes para o público. Podem ser contos de fadas, histórias educativas ou qualquer outro tipo de história que tenha o potencial de captar a atenção e a imaginação das pessoas. Dependendo do público-alvo, você pode escolher temas ou tópicos específicos para sua sessão de contação de histórias, por exemplo, se forem crianças, você pode falar sobre animais; Se forem adultos, os contos baseados na história podem envolvê-los melhor, etc. Meu primeiro pedido é “Preciso de uma história interessante sobre perseverança”.");
  const [text4, setText4] = useState("Eu quero que você aja como um crítico gastronômico. Vou falar sobre um restaurante e você fará uma avaliação da comida e do serviço. Você só deve responder com sua avaliação e nada mais. Não escreva explicações. Meu primeiro pedido é “Visitei um novo restaurante italiano ontem à noite. Você pode fornecer uma revisão?”");
  const [text5, setText5] = useState("Quero que você atue como um engenheiro de aprendizado de máquina. Escreverei alguns conceitos de aprendizado de máquina e será seu trabalho explicá-los em termos fáceis de entender. Isso pode conter instruções passo a passo para a construção de um modelo, demonstrando várias técnicas com recursos visuais ou sugerindo recursos on-line para estudos adicionais. Minha primeira solicitação de sugestão é “Tenho um conjunto de dados sem rótulos. Qual algoritmo de aprendizado de máquina devo usar?”");
  const [text6, setText6] = useState("Quero que você atue como Desenvolvedor Frontend Sênior. Descreverei os detalhes de um componente que estou desenvolvendo, utilizando algumas destas ferramentas: Create React App, yarn, Yup, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. Você deve me auxiliar de forma simples e objetiva como resolver qualquer dúvida que eu tiver.  Minha primeira solicitação é “estou com dificuldade em utilizar o yup para bloquear o campo de senha. ”");
  const [text7, setText7] = useState("Eu quero que você atue como um gerador de mensagens de commit. Fornecerei informações sobre a tarefa e o prefixo do código da tarefa e gostaria que você gerasse uma mensagem de commit apropriada usando o formato de conventional commit em inglês. Não escreva nenhuma explicação ou outras palavras, apenas responda com a mensagem de confirmação. Meu primeiro pedido é “ajuste de rodapé.”");
  const [text8, setText8] = useState("Quero que você atue como CEO de uma empresa hipotética. Você será responsável por tomar decisões estratégicas, gerenciar o desempenho financeiro da empresa e representar a empresa para as partes interessadas externas. Você receberá uma série de cenários e desafios para responder e deverá usar seu melhor julgamento e habilidades de liderança para encontrar soluções. Lembre-se de permanecer profissional e tomar decisões que sejam do melhor interesse da empresa e de seus funcionários. Seu primeiro desafio é: “enfrentar uma possível situação de crise em que um recall de produto é necessário. Como você vai lidar com essa situação e que medidas vai tomar para mitigar qualquer impacto negativo na empresa?”");


  const textareaRef1 = React.useRef(null);
  const textareaRef2 = React.useRef(null);
  const textareaRef3 = React.useRef(null);
  const textareaRef4 = React.useRef(null);
  const textareaRef5 = React.useRef(null);
  const textareaRef6 = React.useRef(null);
  const textareaRef7 = React.useRef(null);
  const textareaRef8 = React.useRef(null);
  return (
    <div>
      
        <div className='prompts-align'>
            <h2 id='Prompts'>Prompts</h2>
            <h3> Crie um E-MAIL</h3>
            <span>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: baixa </span>
                <TextArea 
                text={text1}
                textareaRef={textareaRef1}
                onChange={e => setText1(e.target.value)} />

              <h3> Configurar API em fastAPI</h3>
              <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/edurodrigues533'> @edurodrigues533 </a> complexidade: média </span>
                <TextArea 
                text={text2}
                textareaRef={textareaRef2}
                onChange={e => setText2(e.target.value)} />

                <h3> Atue como um contador de histórias</h3>
                <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: alta </span>
                <TextArea 
                text={text3}
                textareaRef={textareaRef3}
                onChange={e => setText3(e.target.value)} />

                <h3> Atue como um crítico gastronômico</h3>
                <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: baixa </span>
                <TextArea 
                text={text4}
                textareaRef={textareaRef4}
                onChange={e => setText4(e.target.value)} />

                <h3> Atue como um Engenheiro de aprendizado de máquina</h3>
                <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: alta </span>
                <TextArea 
                text={text5}
                textareaRef={textareaRef5}
                onChange={e => setText5(e.target.value)} />
                
                <h3> Atue como Desenvolvedor Frontend Sênior</h3>
                <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: alta </span>
                <TextArea 
                text={text6}
                textareaRef={textareaRef6}
                onChange={e => setText6(e.target.value)} />

                <h3> Gerador de Conventional Commit</h3>
                <span className='contribuicao-span'>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: baixa </span>
                <TextArea 
                text={text7}
                textareaRef={textareaRef7}
                onChange={e => setText7(e.target.value)} />

            <h3> Atuar como Diretor Executivo</h3>
            <span>Contribuição de: <a target="_blank" href='https://github.com/lucasamaraloliveira'> @lucasamaral </a> complexidade: media </span>
                <TextArea 
                text={text8}
                textareaRef={textareaRef8}
                onChange={e => setText8(e.target.value)} />


            </div>
    </div>
    
  )
}

export default Projects