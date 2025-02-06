import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Phone, Linkedin, DollarSign, X } from 'lucide-react';

interface FreelancerData {
  name: string;
  email: string;
  address: string;
  state: string;
  country: string;
  linkedin: string;
  phoneNumber: string;
  categories: string;
  projectTitle: string;
  projectDescription: string;
  url: string;
  status: string;
  amount: number;
}

interface ModalProps {
  data: FreelancerData;
  isOpen: boolean;
  onClose: () => void;
}

export default function FreelancerModal({ data, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 z-50">
        <Card className="bg-tranparent backdrop-blur-md shadow-xl overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {getInitials(data.name)}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">{data.name}</h1>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-blue-500/80 hover:bg-blue-500/90 text-white">
                    {data.categories}
                  </Badge>
                  <Badge variant="outline" className="border-green-500/50 text-white bg-green-50/50">
                    {data.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-white">{data.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-white">{data.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span className="text-white">{`${data.address}, ${data.state}, ${data.country}`}</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-blue-500" />
                <a href={data.linkedin} target='_window' className="text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Featured Project</h2>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">{data.projectTitle}</h3>
                <p className="text-white mb-4">{data.projectDescription}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    <span className="text-white">${data.amount}/hr</span>
                  </div>
                  {data.url && (
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}