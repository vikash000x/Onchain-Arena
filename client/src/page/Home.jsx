import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { ethers } from "ethers";

import { CustomButton, CustomInput, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
 
      console.log("register clicked");
      if(contract) console.log(contract);

      if (!walletAddress) {
        console.error("Wallet not connected or address missing!");
        return;
      } else {
        console.log("Wallet Address:", walletAddress);
      }

      console.log("Type of Wallet Address:", typeof walletAddress);

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log("Connected Chain ID:", chainId);

     // const playerExists = await contract.isPlayer(walletAddress);


      try {
        console.log("Checking if player exists...");
        console.log("Contract functions:", contract.interface.functions);

        const playerExists = await contract.isPlayer(ethers.utils.getAddress(walletAddress));

        
        // const playerExists = await contract.isPlayer(walletAddress);
        console.log("playerExists result:", playerExists);
      } catch (err) {
        console.error("Error calling isPlayer:", err);
        return;
      }
      


      if(playerExists ){
        console.log("player exists");
      } else {
        console.log("player does not exist");
      }


      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 });

        console.log("not existed");

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        });
        console.log("made");

        setTimeout(() => navigate('/create-battle'), 8000);
      }else console.log("previously existed");
    } catch (error) {
      setErrorMessage(error);
      console.log("error");
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);
      console.log("checking of exist both or not");

      if (playerExists && playerTokenExists) navigate('/create-battle');
    };

    if (contract) createPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    )
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
    <footer className="bg-muted/50 py-5  ">
      <div className="container mx-auto px-4 text-center text-gray-200">
      <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
        <p className="text-lg font-semibold">Welcome to Vikash Codex Clan 💗</p>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://github.com/vikash000x"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-gray-400 transition duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/vikash-sinha-215000259/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-gray-400 transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://x.com/vikash_sinha_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-gray-400 transition duration-300"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
    </Tilt>
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game

    
  </>,
);
