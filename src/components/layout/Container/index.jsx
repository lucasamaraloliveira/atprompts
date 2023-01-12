import React from 'react'
import './Container.css'
import IA from '../../../assets/ia.svg'
import Projects from './Projects'
import ReactPlayer from 'react-player';



function Container() {
  return (
    <div className= "container" >
        <div className="container-img">
        <img className="teste" src={IA} alt="ia" />
          <h2 id='About'>ATPrompts</h2>
          <p><b>ATPrompts</b> foi projetado para melhorar a experiência do usuário ao lidar com prompts, 
            com apenas alguns cliques você pode facilmente editar e copiar os prompts 
            no site de acordo com suas necessidades e preferências específicas, 
            e o botão de <b>cópia</b> copiará o prompt exatamente como você o editou.</p>
            <ReactPlayer
      url='https://www.youtube.com/watch?v=BotTR6iV6tM' 
      //  src/assets/clipboard.mp4
      playing
      loop
      width='700px'
      height='300px'
      />
          <Projects/>
        </div>
        
        </div>
  )
}

export default Container