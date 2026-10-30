'use client';

interface GameHelpProps {}

export const GameHelp: React.FC<GameHelpProps> = ({}) => {
  const downloadInstructions = () => {
    const fileUrl = `/instructions/DealQuest_instructions_V2.pdf`;
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary URL for the blob object
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'DealQuest_instructions.pdf'; // Specify the filename for the downloaded file

        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the temporary URL
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };
  return (
    <button
      className="[ dqSecondaryButton ] w-full text-alpha-light-800 border-alpha-light-800 text-center"
      onClick={downloadInstructions}
    >
      Download instructions
    </button>
  );
};
