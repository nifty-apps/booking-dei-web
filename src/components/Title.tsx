interface TitleTextProps {
  text: string;
}

const TitleText = ({ text }: TitleTextProps) => {
  return <h2 className="text-3xl font-semibold">{text}</h2>;
};

export default TitleText;
