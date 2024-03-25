import { useState, useEffect } from 'react'

import './App.css'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { auth, app } from '../firebase'

const db = getFirestore(app)


function App() {

  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"))
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    return unsubscribe
  }, [])


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    })

    setNewMessage("")
  }


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()

    try {

      await signInWithPopup(auth, provider)


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-center bg-gray-100 py-10 min-h-screen'>
      {user ? (
        <div className="chat-container">
          <div className="user-info" >Logged in as {user.displayName}</div>
          <button className='logout-button' onClick={() => auth.signOut()}>Đăng Xuất</button>

          <div className="message-container">
            <ul className="message-list">
              {messages.map(msg => (
                <li key={msg.id} className={`message ${msg.data.uid === user.uid ? 'sent' : 'received'}`}>
                  <div className="message-content">
                    <img className='user-avatar' src={msg.data.photoURL} alt="User Avatar" />
                    <div className="message-text">{msg.data.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <input
            className="message-input"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className='send-button' onClick={sendMessage}>Gửi</button>
        </div>
      ) :
      <div className="chat-container">
      <label className='title-login'> Phụ Nữ Phường Hòa Khánh Bắc</label>
      <br />
      <label className='title-dangnhap'>Đăng Nhập</label>
      <br />
      <input type="text" name="" id="" className='input-text' placeholder='Tài Khoản' />
      <input type="password" name="" id="" className='input-text' placeholder='Mật Khẩu'/>
      <button className="login-button">Đăng Nhập</button>
      <div className="message-container">
      </div>
       <button className="login-button" onClick={handleGoogleLogin}>Đăng Nhập với google</button>
       <a href=""><button className="login-button">Bạn Không phải hội viên ?</button></a>
       
    </div>  
        
      }
    </div>
  )
}

export default App