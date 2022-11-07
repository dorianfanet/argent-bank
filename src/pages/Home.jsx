import bankTree from '../assets/bank-tree.jpeg'
import { homeFeaturesData } from '../data/homeFeaturesData'
import HomeFeature from '../components/HomeFeature'

export default function Home() {
  return (
    <main>
      <div className="hero" style={{backgroundImage: `url(${bankTree})`}}>
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {homeFeaturesData.map((feature) => 
          <HomeFeature
            img={feature.img}
            alt={feature.alt}
            title={feature.title}
            content={feature.content}
          />
        )}
      </section>
    </main>
  )
}