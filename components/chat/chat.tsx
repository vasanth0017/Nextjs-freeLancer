"use client";
import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { deleteMsg, getMessage, storeChatDetails } from "@/services/apicall";
import toast from "react-hot-toast";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
type UserIdObject = {
  userId: string;
};
export default function Chat({
  serviceData,
  userId,
  senderName,
}: {
  serviceData: any;
  userId: any;
  senderName: string;
}) {
 
  //senderId
  const userIdObj = userId as UserIdObject;
  const id = userId;
  const contractId = serviceData?.contracts?.[0]?.id;
  const freelaunncerId = serviceData?.contracts?.[0]?.userId;
  const freelancerSerciveId = serviceData?.id;
  const receiverName = serviceData?.name;
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
 
  useEffect(() => {
    const fetchMessages = async () => {
      const response: any = await getMessage(contractId);
      //check for dupliacte entry but now we not use this code
      const messagesWithUniqueKeys = response.map((msg: any) => ({
        ...msg,
        clientKey: msg.id || `${Date.now()}-${Math.random()}`,
      }));
      setMessages(response);
    };
    fetchMessages();
  }, [contractId]);

  // Listen for new messages
  useEffect(() => {
    const initializeSocket = async () => {
      await fetch("/api/socket"); // Calls the API route to start the server
      console.log("Socket.IO server initialized.");

      socket = io({
        path: "/socket.io",
        transports: ["websocket", "polling"],
      });

      socket.on("receiveMessage", (message) => {
        setMessages((prev) => {
          const messageExists = prev.some((msg) => msg.id === message.id);
          if (messageExists) return prev;
          return [...prev, message];
        });
      });

      socket.on("disconnect", () => {
        console.log(" Disconnected from Socket.IO");
      });
    };

    initializeSocket();

    return () => {
      if (socket) socket.disconnect(); // Cleanup socket on unmount
    };
  }, []);

  // Send Message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const senderId = id;
    const receiverId = freelaunncerId;
    const content = newMessage;
    const freelancerId = freelancerSerciveId;
    // Send message to API
    const response = await storeChatDetails({
      contractId,
      senderId,
      receiverId,
      content,
      freelancerId,
    });
    if (socket) {
      socket.emit("sendMessage", response);
      setMessages((prev) => [...prev, response]);
      setNewMessage("");
    } else {
      console.error("Message not sent via WebSocket.");
    }
  };

  //handle delete
  const handleDelete = async (messageId: any) => {
    try {
      await deleteMsg(messageId);
      toast.success("deleted successfully");
    } catch (error) {
      console.error(error);
    }
    setMessages(messages.filter((msg) => msg.id !== messageId));
  };
  //for chat name

  return (
    <div className="p-6 border rounded-xl shadow-lg w-full max-w-md bg-white">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Messages</h3>

      <div className="h-96 overflow-y-auto px-2 mb-4">
        {messages.map((msg) => {
          const isSender = msg.senderId === id;
          const name = isSender ? senderName : receiverName;
          const initials = (name || "Anonymous").slice(0, 2).toUpperCase();

          return (
            <div
              key={msg.id}
              className={`flex ${
                isSender ? "justify-end" : "justify-start"
              } mb-4 items-end`}
            >
              {!isSender && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 mr-2">
                  {initials}
                </div>
              )}

              <div
                className={`max-w-[80%] ${
                  isSender
                    ? "flex flex-row-reverse items-start"
                    : "flex flex-row items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    isSender
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                </div>

                {isSender && (
                  <Button
                    onClick={() => handleDelete(msg.id)}
                    className={`opacity-0 hover:opacity-100 transition-opacity duration-200 px-2 text-gray-400 hover:text-red-500 ${
                      isSender ? "mr-2" : "ml-2"
                    }`}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {isSender && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600 ml-2">
                  {initials}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
