import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactoFormulario.css'
import useUsuarios from '../../hooks/useUsuarios';

// Muestra el componente de contacto.
const ContactoFormulario = () => {
  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { usuario } = useUsuarios();
  
  // Se declaran los estados necesario en ámbito local.
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  // Rellena automáticamente el nombre del usuario y el correo en el formulario de contacto.
  useEffect(() => {
    if (usuario) {
      setFormData({
        ...formData,
        nombre: usuario.nombre + " " + usuario.apellido_1 + " " + usuario.apellido_2,
        correo: usuario.email,
      });
    }
  }, [usuario]);

  // Actualiza los datos del formulario de contacto.
  const actualizarDatoForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Envía el correo.
  const enviarCorreo = (e) => {
    e.preventDefault();

    fetch('https://getform.io/f/jawxmoqb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('¡Mensaje enviado con éxito!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFormData({
            ...formData,
            asunto: '',
            mensaje: '',
          });
        } else {
          toast.error('Hubo un error al enviar tu mensaje.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Hubo un error al enviar tu mensaje.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // Pinta el formulario de contacto.
  return (
    <div id='ContenedorFormulario'>
      <form onSubmit={enviarCorreo} className="contact-form">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre + " " + usuario.apellido_1 + " " + usuario.apellido_2}
            disabled
            required
          />
        </div>
        <div>
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={usuario.email}
            disabled
            required
          />
        </div>
        <div>
          <label htmlFor="asunto">Asunto</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={actualizarDatoForm}
            required
          />
        </div>
        <div>
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={actualizarDatoForm}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactoFormulario;
