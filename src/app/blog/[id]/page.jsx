import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.infoTitle}>{data.title}</h1>
          <p className={styles.infoDesc}>{data.desc}</p>
          <div className={styles.author}>
            <Image
              className={styles.authorImg}
              width={40}
              height={40}
              src="https://images.pexels.com/photos/12417133/pexels-photo-12417133.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
            <span className={styles.name}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <Image className={styles.img} fill={true} src={data.img} alt="" />
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
