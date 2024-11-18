import DatePicker from "./DatePicker";

function Header() {
  return (
    <>
      <header className="mt-6 mb-10 flex items-center justify-center gap-2">
        <h1 className="text-6xl font-black text-rose-100">
          daily
          <span className="text-8xl pl-0 text-rose-500 opacity-70 _text-handwritten">
            Do
          </span>
        </h1>
      </header>
      <div className="flex justify-center mt-4 mb-8">
        <DatePicker />
      </div>
    </>
  );
}

export default Header;
