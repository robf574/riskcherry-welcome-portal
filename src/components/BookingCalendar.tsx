import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, Save, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface BookingCalendarProps {
  onBack: () => void;
  onComplete: () => void;
}

const BookingCalendar = ({ onBack, onComplete }: BookingCalendarProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo available time slots
  const availableSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Validation Error",
        description: "Please select both a date and time for your demo call",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to book the demo
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store booking data
    const bookingData = {
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('riskcherry-demo-booking', JSON.stringify(bookingData));

    toast({
      title: "Demo Booked Successfully!",
      description: `Your demo call is scheduled for ${format(selectedDate, 'MMMM do, yyyy')} at ${selectedTime}`,
    });

    setIsSubmitting(false);
    onComplete();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const disabledDays = (date: Date) => {
    return isWeekend(date) || isPastDate(date);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Book Demo & Intro Call</h1>
          <p className="text-muted-foreground">
            Schedule a personalized demo session and introduction call with our certification team
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>
                    Choose a date for your demo call (weekdays only)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                initialFocus
                className="rounded-md border p-3 pointer-events-auto"
              />
              {selectedDate && (
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm font-medium text-accent-foreground">
                    Selected: {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle>Select Time</CardTitle>
                  <CardDescription>
                    Choose your preferred time slot (GMT timezone)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Please select a date first to see available time slots</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => handleTimeSelect(time)}
                        className="h-12 font-mono"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  
                  {selectedTime && (
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        Selected: {selectedTime} GMT
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Demo Details */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle>What to Expect</CardTitle>
                <CardDescription>
                  Here's what we'll cover during your demo call
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center text-xs">1</Badge>
                  Portal Walkthrough
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-8">
                  <li>• Complete portal interface tour</li>
                  <li>• Account management features</li>
                  <li>• Document upload process</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center text-xs">2</Badge>
                  Certification Process
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-8">
                  <li>• Testing procedures overview</li>
                  <li>• Timeline and milestones</li>
                  <li>• Compliance requirements</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center text-xs">3</Badge>
                  Q&A Session
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-8">
                  <li>• Answer your specific questions</li>
                  <li>• Technical requirements clarification</li>
                  <li>• Custom solution discussion</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center text-xs">4</Badge>
                  Next Steps
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-8">
                  <li>• Project timeline planning</li>
                  <li>• Resource allocation</li>
                  <li>• Action items and follow-up</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Summary & Submit */}
        {selectedDate && selectedTime && (
          <Card className="mt-8 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
                  <p className="text-muted-foreground">
                    <CalendarIcon className="w-4 h-4 inline mr-2" />
                    {format(selectedDate, 'EEEE, MMMM do, yyyy')} at {selectedTime} GMT
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Duration: ~45 minutes
                  </p>
                </div>
                <Button 
                  onClick={handleBooking}
                  disabled={isSubmitting}
                  className="gap-2 gradient-cherry"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;