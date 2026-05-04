import React from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      
      <div className="min-h-screen flex flex-col font-sans bg-gradient-to-r from-[#dcedfe] via-[#f8fafc] to-[#fef8c4]">
        <Header/>
        <LandingPage/>
      </div>
    </>
  );
}

export default App;