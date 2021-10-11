// function to format seconds to proper time duration
const GetDurationFormat = (duration: any) => {
    let time = duration / 1000;
    let minutes = Math.floor(time / 60);
    let timeForSeconds = time - minutes * 60;
    let seconds = Math.floor(timeForSeconds);
    let secondsReadable = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${secondsReadable}`;
};

// function to generate random number
const GenerateUniqueID = () => Math.floor(Math.random() * Date.now()).toString()

// Function to remove extension from file name
const RemoveExtension = (fileName: string) => {
    const lastIndexOf = fileName.lastIndexOf('.')
    if (lastIndexOf === -1) return fileName;
    return fileName.substring(0, lastIndexOf);
}

export default {
    GetDurationFormat, GenerateUniqueID, RemoveExtension
};