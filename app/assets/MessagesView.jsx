"use client"
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

export default function MessagesView() {
  const [messages, setMessages] = useState([]);
  const [actualMessage, setActualMessage] = useState({});
  const [actualIndex, setActualIndex] = useState(0);

  useEffect(() => {
    // Función para obtener los mensajes de la colección "estancia"
    const getEstanciaMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'estancia'));
        const messagesData = querySnapshot.docs.map(doc => doc.data().messages);
        setMessages(messagesData[0]);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    // Llamar a la función para obtener los mensajes al montar el componente
    getEstanciaMessages();
  }, []);

  useEffect(() => {
    // Actualizar el mensaje actual cuando cambie el índice
    setActualMessage(messages[actualIndex]);
  }, [actualIndex, messages]);

  useEffect(() => {
    // Reiniciar el índice cuando cambie el array de mensajes
    setActualIndex(0);
  }, [messages]);

  useEffect(() => {
    // Avanzar al siguiente índice cada segundo si hay mensajes
    const interval = setInterval(() => {
      setActualIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 3000);

    // Limpiar el intervalo cuando el componente se desmonte o cuando no hay mensajes
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div>
      <div>Messages View</div>
      <div>Actual Message: {actualMessage === undefined ? <p>Cargando</p> : <p>{actualMessage.message}</p>}</div>
    </div>
  );
}
