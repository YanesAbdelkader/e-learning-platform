"use client"

import { useState, useEffect, useCallback } from "react"
import { Episode, NewEpisode } from "../_components/types"

export function useEpisodes(courseId: string) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEpisodes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Replace this with an actual API call
      const response = await fetch(`/api/courses/${courseId}/episodes`)
      if (!response.ok) {
        throw new Error("Failed to fetch episodes")
      }
      const data = await response.json()
      setEpisodes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    fetchEpisodes()
  }, [fetchEpisodes])

  const addEpisode = async (newEpisode: NewEpisode) => {
    try {
      // TODO: Replace this with an actual API call
      const response = await fetch(`/api/courses/${courseId}/episodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEpisode),
      })
      if (!response.ok) {
        throw new Error("Failed to add episode")
      }
      const addedEpisode = await response.json()
      setEpisodes([...episodes, addedEpisode])
      return addedEpisode
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add episode")
      throw err
    }
  }

  const updateEpisode = async (updatedEpisode: Episode) => {
    try {
      // TODO: Replace this with an actual API call
      const response = await fetch(`/api/courses/${courseId}/episodes/${updatedEpisode.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEpisode),
      })
      if (!response.ok) {
        throw new Error("Failed to update episode")
      }
      const updated = await response.json()
      setEpisodes(episodes.map((ep) => (ep.id === updated.id ? updated : ep)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update episode")
      throw err
    }
  }

  const deleteEpisode = async (id: string) => {
    try {
      // TODO: Replace this with an actual API call
      const response = await fetch(`/api/courses/${courseId}/episodes/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete episode")
      }
      setEpisodes(episodes.filter((episode) => episode.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete episode")
      throw err
    }
  }

  const reorderEpisodes = async (reorderedEpisodes: Episode[]) => {
    try {
      // TODO: Replace this with an actual API call
      const response = await fetch(`/api/courses/${courseId}/episodes/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reorderedEpisodes),
      })
      if (!response.ok) {
        throw new Error("Failed to reorder episodes")
      }
      const updatedEpisodes = await response.json()
      setEpisodes(updatedEpisodes)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reorder episodes")
      throw err
    }
  }

  return {
    episodes,
    isLoading,
    error,
    addEpisode,
    updateEpisode,
    deleteEpisode,
    reorderEpisodes,
  }
}

