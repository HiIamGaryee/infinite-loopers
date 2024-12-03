import React from "react";
import logo from "../assets/logo.png";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-orange-50  text-black p-6">
      {/* Header */}
      <h1 className="text-center font-bold text-2xl pt-2">About</h1>

      {/* Version Info */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">App Version</h3>
        <p className="text-sm text-gray-400 mt-1">1.0.0</p>
        <p className="text-sm text-gray-500 mt-2">
          The AI Emotional Intelligence Assistant Chrome Extension is your
          personalized companion, designed to revolutionize the way you
          communicate and navigate the digital world. Powered by cutting-edge AI
          technology, this extension enhances your browsing experience by
          offering emotionally intelligent responses tailored to various
          communication tones, including professional, casual, romantic, and
          more. Whether you're drafting an email, engaging in conversations, or
          managing tasks, the assistant adapts to your unique preferences to
          provide meaningful and contextually appropriate suggestions. Beyond
          its communication capabilities, the extension offers a sleek and
          intuitive user interface, complete with features like profile
          customization, quick navigation to settings, and robust privacy
          protections. Designed with user empowerment in mind, it provides
          instant access to resources such as privacy policies, support, and
          personalized configurations. The assistant also integrates seamlessly
          with your daily activities, helping you express yourself effectively
          while maintaining efficiency and clarity. With a focus on both
          productivity and emotional resonance, the AI Emotional Intelligence
          Assistant ensures every interaction is not only smart but also
          human-centered. Whether you're a professional seeking polished
          communication or someone looking for a creative touch in your
          messages, this extension is the ultimate tool for modern, emotionally
          intelligent interactions.
        </p>
      </div>

      {/* Links Section */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-black">Links</h3>
        <div className="space-y-3">
          <p className="block cursor-pointer text-xs text-blue-400 hover:underline">
            Privacy Policy
          </p>
          <p className="block cursor-pointer text-xs text-blue-400 hover:underline">
            Terms of Use
          </p>

          <p className="block cursor-pointer text-xs text-blue-400 hover:underline">
            Visit our Website
          </p>
          <p className="block cursor-pointer text-xs text-blue-400 hover:underline">
            Contact Us
          </p>
        </div>
      </div>
      <div className="my-6">
        <h3 className="text-lg font-bold text-black">Created by</h3>
        <img src={logo} alt="Logo" className="h-16 w-auto mx-auto" />
      </div>
    </div>
  );
};

export default AboutUsPage;
