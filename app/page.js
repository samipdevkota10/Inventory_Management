'use client'
import { Button, TextField, Typography } from "@mui/material";
import{Box} from "@mui/material";
import {Modal} from "@mui/material"
import {useState, useEffect} from 'react'
import {collection,getDocs,doc,setDoc, deleteDoc} from "firebase/firestore";
import { query } from "firebase/firestore";
import {firestore} from "@/firebase";
export default function Home() {
  const [InventorywAuth, setInventory] =useState([])
  const [open, setOpen] =useState(false)
  const [itemName, setItemName] =useState('')


  const updateInventory = async()=>{
    const snapshot = query(collection(firestore, 'Inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList=[]
    docs.forEach((doc)=>{
      inventoryList.push({
        name:doc.id ,
        ...doc.data(),
      })
      })
    setInventory(inventoryList)
  }

  useEffect(()=>{
    updateInventory()
  }, [])

  const removeItem = async(item) =>{

    if(!item){
      console.error("invalid Item ID");
      return;
    }
    const docRef = doc(collection(firestore,'Inverntory'),item)
    const docSnap= await getDocs(docRef)

    if(docSnap.exists()){
      const {quantity} =docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      }
      else{ 
        await setDoc(docRef,{quantity: quantity-1})
      }
    }
    await updateInventory()
  }
  const addItem = async(item) =>{
    const docRef = doc(collection(firestore, 'Inventory'),item)
    const docSnap= await getDocs(docRef)

    if(docSnap.exists()){
      const {quantity} =docSnap.data()
        await setDoc(docRef,{quantity: quantity+1})
    }
    else{
      await setDoc(docRef, {quantity:1})
    }
    await updateInventory()
  }

  const handelOpen =() => setOpen(true)
  const handelClose=() => setOpen(false )




  return (

    <Box
      width ="100vw"
      height="100vh"
      justifyContent={"center"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      >
      <Modal
        open={open}
        onClose={handelClose}>
          <Box
          position="absolute"
          top="50%"
          left="50%"
          trasnform="translate(-50%,-50%)">

          </Box>
      </Modal>
      <Typography variant="h2">
        Inventory Management System
      </Typography>
      <TextField
      variant="outlined"
      fullWidth
      value={itemName}
      onChange={(e)=>{
        setItemName(e.target.value)
      }}></TextField>
      <Button
        variant="outlined"
        onClick={()=>{
          addItem(itemName)
          setItemName('')
          handelClose()}}> Submit </Button>
        
  
    </Box>
   
  );
}
