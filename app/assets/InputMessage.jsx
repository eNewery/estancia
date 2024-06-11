"use client"
import { useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";

export default function InputMessage() {
    const [input, setInput] = useState("");

    async function sendMessage() {
        try {
            // Obtener la colección "estancia"
            const estanciaCollectionRef = collection(db, 'estancia');

            // Obtener los documentos de la colección "estancia"
            const querySnapshot = await getDocs(estanciaCollectionRef);
            
            querySnapshot.forEach((document) => {
                // Obtener el array de mensajes actual del documento
                const messagesArray = document.data().messages || [];

                // Agregar el nuevo mensaje al array de mensajes
                messagesArray.push({ message: input }); // Puedes ajustar la estructura del objeto según tus necesidades

                // Actualizar el array de mensajes en el documento
                const docRef = doc(db, 'estancia', document.id);
                updateDoc(docRef, { messages: messagesArray });

                console.log("Mensaje enviado correctamente");
                setInput(""); // Limpiar el input después de enviar el mensaje
            });
        } catch (error) {
            console.error("Error al enviar el mensaje: ", error);
        }
    }

    return (
        <div>
            <input onChange={(e) => setInput(e.target.value)} type="text" placeholder="mensaje" value={input} />
            <button onClick={sendMessage}>Enviar Mensaje</button>
        </div>
    );
}
