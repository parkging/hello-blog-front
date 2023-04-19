import axios from "axios";
import { DiscussionEmbed } from "disqus-react";
function Comment({ post }) {
  console.log(window.location.href);
  return (
    <div className="row mt-5">
      <br />
      <br />
      <hr />
      <DiscussionEmbed
        shortname="test-blog-discus"
        config={{
          url: axios.defaults.discusURL,
          identifier: window.location.href,
          title: post.title,
          language: "ko",
        }}
      />
    </div>
  );
}

export default Comment;
