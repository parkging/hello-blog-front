import axios from "axios";
import { DiscussionEmbed } from "disqus-react";
function Comment({ post }) {
  return (
    <div className="row mt-5">
      <br />
      <br />
      <hr />
      <DiscussionEmbed
        shortname="test-blog-discus"
        config={{
          url: `${axios.defaults.discusURL}/post/${post.id}-1`,
          identifier: `${axios.defaults.discusURL}/post/${post.id}-1`,
          title: post.title,
          language: "ko",
        }}
      />
    </div>
  );
}

export default Comment;
