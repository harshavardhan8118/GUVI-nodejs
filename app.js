require("dotenv").config()
const e = require("express")
const express= require("express")
const app= express()
const PORT = 4000;

app.use(express.json())

const rooms=[
    {
        name:"Elite",
        seats:100,
        amenities:"wifi,projection screen,AC",
        price:1500,
        roomId:"abc",
        bookingDetails:[{
            customerName:"harsha",
            date:new Date("2022-11-10"),
            start:"07:00",
            end:"10:00",
            status:"confirmed"
        }]
    },
    {
        name:"Premium",
        seats:150,
        amenities:"wifi,projection screen,AC",
        price:2500,
        roomId:"def",
        bookingDetails:[{
            customerName:"vardhan",
            date:new Date("2022-11-11"),
            start:"15:00",
            end:"17:00",
            status:"Payment Pending"
        }]
    }
]
//create room
app.post("/createRoom",(request,response)=>{

    rooms.push({
        name:request.body.name,
        seats:request.body.seats,
        amenities:request.body.amenities,
        price:request.body.price,
        roomId:"ghi",
        bookingDetails:[{}]
    })
res.send("Room Created")
})



//Book rooms
app.post("/bookRoom",(request,response,next)=>{
for(let i=0;i<rooms.length;i++)
{
    console.log("a")
    if(! (rooms[i].roomId === request.body.roomId)){
         return response.status(400).send({error:"Invalid"})
          
    }
    else
    {
        let booking={
            customerName:request.body.name,
            date:new Date(request.body.date),
            start:request.body.start,
            end:request.body.end,
            status:"confirmed"
        }
        let result=undefined;
        rooms[i].bookingDetails.forEach((book)=>{
            if(book.date.getTime() == booking.date.getTime()  && book.start === booking.start )
            {
                result=0
                console.log("in booking")
                //  return res.status(400).send({error:"Please select different time slot"})
                  
            }
            else{
                result=1
                rooms[i].bookingDetails.push(booking)
                // return res.status(200).send("Booking confirmed")
            }
        })
        if(result)
        return response.status(200).send("Booking confirmed")
        else
        return response.status(400).send({error:"Please select different time slot"})

    }
    
}
})

//List the customers

app.get("/listCustomer",(request,response)=>{

    let customerArray=[];
    
    rooms.forEach((room)=>{
        let customerObj={roomName:room.name}
    
        room.bookingDetails.forEach((customer)=>{
            customerObj.customerName=customer.customerName
             customerObj.date=customer.date
            customerObj.start=customer.start
            customerObj.end=customer.end
    
            customerArray.push(customerObj)
        })
    })
    
    response.send(customerArray)
    
    })

//List room along with booking details

app.get("/listRooms",(request,response)=>{
    response.status(400).send(rooms)
})




app.listen(PORT,()=>
    console.log("server running in port",PORT)
)