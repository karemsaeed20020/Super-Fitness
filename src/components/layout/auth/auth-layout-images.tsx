export default function AuthLayoutImages() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Upper Part */}
      <div>
        <img
          src="/assets/images/logo.webp"
          alt="logo"
          className="h-full w-50.75 object-cover"
        />
      </div>

      {/* Lower Part */}
      <div>
        <img
          src="/assets/images/person.png"
          alt="Person"
          className="h-100 w-150"
        />
      </div>
    </div>
  );
}
