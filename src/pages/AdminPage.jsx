import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import AdminLogin from './AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

export default function AdminPage() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={(sess) => setSession(sess)} />
  }

  return <AdminDashboard session={session} onLogout={handleLogout} />
}