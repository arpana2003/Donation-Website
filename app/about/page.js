import React from 'react'

const About = () => {
  return (
    <>
     

    <main class="flex items-center justify-center min-h-screen max-w-2xl mx-auto md:px-2 px-4 ">
        
        
        <section class="mb-8">

        <div class="text-center mb-8">
            <h1 class="text-5xl font-extrabold text-white mb-4">About Us</h1>
            <p class="text-xl text-white">Empowering dreams, one cup of chai at a time.</p>
        </div>

            <p class="text-lg text-white leading-relaxed mb-4">
                Welcome to <strong class="font-semibold text-indigo-600">Get Me A Chai</strong> – a crowdfunding platform designed to bring your dreams to life while enjoying a cup of chai. Our mission is to support creative projects, community initiatives, and personal goals by connecting passionate individuals with contributors who share their vision.
            </p>
            
            <p class="text-lg text-white leading-relaxed mb-4">
                Founded in 2024, we believe in the power of community and the joy of giving. Whether you’re looking to fund your next big idea or support someone else’s dream, we’re here to make the process simple and rewarding.
            </p>
            
            <p class="text-lg text-white leading-relaxed mb-4">
                At <strong class="font-semibold text-indigo-600">Get Me A Chai</strong>, we provide a seamless experience for both project creators and backers. Our platform is built to foster transparency, trust, and a sense of accomplishment. Join us in making a difference – one project at a time.
            </p>
        </section>
        
        
    </main>


    </>
  )
}

export default About

// either Static metadata
export const metadata= {
    title: 'About - Get Me A Chai',
  }
