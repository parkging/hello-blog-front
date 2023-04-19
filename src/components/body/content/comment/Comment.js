import { DiscussionEmbed } from "disqus-react";
function Comment({ post }) {
  return (
    <div className="row mt-5">
      <br />
      <br />
      <hr />
      <hr />
      <DiscussionEmbed
        shortname="test-blog-discus"
        config={{
          url: "http://1nsad.iptime.org",
          identifier: post.id,
          title: post.title,
          language: "ko",
        }}
      />
    </div>
  );
}

export default Comment;
