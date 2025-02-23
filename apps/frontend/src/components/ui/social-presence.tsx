import Script from "next/script";

export function SocialPresence() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Come Hangout With Us!</h2>
        <div className="space-y-2">
          <p className="text-xl text-pink-600">
            We do live everyday at TikTok!
          </p>
          <p className="text-lg">Join us!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* TikTok Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Latest on TikTok</h3>
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
            {/* TikTok Embed */}
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@cakerycan"
              data-unique-id="cakerycan"
              data-embed-type="creator"
              style={{ maxWidth: "780px", minWidth: "288px" }}
            >
              <section>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@cakerycan"
                  rel="noreferrer"
                >
                  @cakerycan
                </a>
              </section>
            </blockquote>
            <Script src="https://www.tiktok.com/embed.js" />
          </div>
        </div>

        {/* Instagram Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Latest on Instagram</h3>
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
            {/* Instagram Embed */}
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/cakerycan/"
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: "0",
                borderRadius: "3px",
                boxShadow:
                  "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px",
                maxWidth: "540px",
                minWidth: "326px",
                padding: "0",
                width: "99.375%",
              }}
            ></blockquote>
            <Script src="//www.instagram.com/embed.js" />
          </div>
        </div>
      </div>

      {/* Live Schedule */}
      <div className="mt-12 bg-pink-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Live Schedule</h3>
        <p className="text-gray-600">
          Join our daily live sessions on TikTok from 2PM to 4PM!
        </p>
        <div className="mt-4">
          <a
            href="https://www.tiktok.com/@cakerycan"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Follow Us on TikTok
          </a>
        </div>
      </div>
    </div>
  );
}
