'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ConditionalNav } from '@/components/conditional-nav';
import { useToast } from '@/components/ui/use-toast';
import { EmailService } from '@/lib/email';
import { Loader2 } from 'lucide-react';
import { Copyright } from '@/components/copyright';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await EmailService.sendEmail({ email, subject, body: message });

      toast({
        title: 'Email sent!',
        description: "We'll get back to you as soon as possible.",
      });
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: 'Error sending email',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConditionalNav />
      <div className='container mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <Card className='max-w-3xl mx-auto'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold text-center'>
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <p className='text-center text-muted-foreground'>
              Have a question, suggestion, or just want to say hello? We&apos;d
              love to hear from you! Fill out the form below and we&apos;ll get
              back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='subject'>Subject</Label>
                <Input
                  id='subject'
                  placeholder='Enter the subject'
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='message'>Message</Label>
                <Textarea
                  id='message'
                  placeholder='Enter your message'
                  className='min-h-[120px] resize-none'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className='text-center'>
                <Button type='submit' size='lg' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Copyright />
    </>
  );
}